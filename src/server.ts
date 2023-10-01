import { fastify } from "fastify";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionsRoute } from "./routes/create-transciption";

const app = fastify();

app.register(getAllPromptsRoute);
app.register(createTranscriptionsRoute);
app.register(uploadVideoRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
