import { FastifyInstance } from "fastify";
import { createReadStream } from "node:fs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";

export async function createTranscriptionsRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (req) => {
    const paramSchema = z.object({
      videoId: z.string().uuid(),
    });

    const { videoId } = paramSchema.parse(req.params);

    const bodySchema = z.object({
      prompt: z.string(),
    });

    const { prompt } = bodySchema.parse(req.body);

    const video = prisma.video.findFirstOrThrow({
      where: {
        id: videoId,
      },
    });

    const videoPath = (await video).path;
    const audioReadStream = createReadStream(videoPath);
    return audioReadStream;

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    // return response;
  });
}
