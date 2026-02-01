
export async function POST(req) {
  const event = await req.json();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Trigger email / tracking / vendor notification
  }

  return Response.json({ received: true });
}
