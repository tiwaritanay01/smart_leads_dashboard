import { Router } from "express";
import { UserRole } from "@/types/user";
import { requireAuth } from "@/middlewares/auth.middleware";
import { requireRole } from "@/middlewares/role.middleware";
import { validate } from "@/middlewares/validate.middleware";
import {
  createLeadRecord,
  deleteLeadRecord,
  exportLeadsCsv,
  getLead,
  listLeads,
  updateLeadRecord
} from "@/controllers/lead.controller";
import {
  createLeadSchema,
  leadIdSchema,
  leadQuerySchema,
  updateLeadSchema
} from "@/validators/lead.validator";

const router = Router();

router.get("/", requireAuth, validate(leadQuerySchema, "query"), listLeads);
router.get(
  "/export",
  requireAuth,
  validate(leadQuerySchema, "query"),
  exportLeadsCsv
);
router.post(
  "/",
  requireAuth,
  requireRole(UserRole.Admin, UserRole.Sales),
  validate(createLeadSchema),
  createLeadRecord
);
router.get("/:id", requireAuth, validate(leadIdSchema, "params"), getLead);
router.put(
  "/:id",
  requireAuth,
  validate(leadIdSchema, "params"),
  validate(updateLeadSchema),
  updateLeadRecord
);
router.delete(
  "/:id",
  requireAuth,
  requireRole(UserRole.Admin),
  validate(leadIdSchema, "params"),
  deleteLeadRecord
);

export default router;
