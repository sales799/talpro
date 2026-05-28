import type { Response } from "express";

export type ProblemErrors = Record<string, string[]>;

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: ProblemErrors;
}

export function sendProblem(
  res: Response,
  problem: ProblemDetails,
) {
  return res
    .status(problem.status)
    .type("application/problem+json")
    .json(problem);
}

export function problemFromError(
  status: number,
  title: string,
  detail: string,
  instance?: string,
): ProblemDetails {
  return {
    type: `https://nirantar.talpro.in/problems/${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`,
    title,
    status,
    detail,
    instance,
  };
}
