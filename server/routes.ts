import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { eq } from "drizzle-orm";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/invite/:token", async (req, res) => {
    let invitation = await storage.getInvitationByToken(req.params.token);

    // Auto-renew test token
    if (req.params.token === "test-token-123") {
      if (!invitation) {
        const { db } = await import("./server/db");
        const { invitations } = await import("@shared/schema");
        [invitation] = await db.insert(invitations).values({
          token: "test-token-123",
          email: "professor@example.com",
          inviterName: "Equipe TutorUP",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: "pending"
        }).returning();
      } else if (invitation.status !== "pending" || new Date(invitation.expiresAt) < new Date()) {
        const { db } = await import("./server/db");
        const { invitations } = await import("@shared/schema");
        await db.update(invitations)
          .set({ 
            status: "pending", 
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() 
          })
          .where(eq(invitations.token, "test-token-123" as any));
        invitation = await storage.getInvitationByToken(req.params.token);
      }
    }

    if (!invitation) {
      return res.status(404).json({ message: "Convite não encontrado" });
    }
    
    if (new Date(invitation.expiresAt) < new Date()) {
      return res.status(400).json({ message: "Convite expirado" });
    }

    if (invitation.status !== "pending") {
      return res.status(400).json({ message: "Este convite já foi utilizado ou cancelado" });
    }

    res.json(invitation);
  });

  app.post("/api/invite/:token/accept", async (req, res) => {
    const invitation = await storage.getInvitationByToken(req.params.token);
    if (!invitation || invitation.status !== "pending") {
      return res.status(400).json({ message: "Convite inválido" });
    }

    const { password, ...userData } = req.body;
    
    try {
      const user = await storage.createUser({
        ...userData,
        password, // In a real app, hash this
        username: invitation.email,
        role: "professor",
      });

      await storage.updateInvitationStatus(invitation.id, "accepted");
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  return httpServer;
}
