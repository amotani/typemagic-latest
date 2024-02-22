import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function OpenAIStream(
  payload: any,
  onComplete: (message: string) => void,
  onError: (error: string) => void
) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  let message = "";

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        try {
          if (event.type === "event") {
            const data = event.data;
            if (data === "[DONE]") {
              onComplete(message);
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const text = json.choices[0].delta.content;

              // Update our message:
              if (text) message += text;

              // Send to the client:
              const queue = encoder.encode(text);
              controller.enqueue(queue);
              counter++;
            } catch (e) {
              console.log("error in stream parsing: ", e);
              controller.error(e);
            }
          }
        } catch (e) {
          console.log("error? ", e);
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks & invoke an event for each SSE event stream
      const parser = createParser(onParse);

      try {
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      } catch (e: any) {
        console.log("ERROR: ", e);
        onError(e.message);
      }
    },
  });

  return stream;
}
