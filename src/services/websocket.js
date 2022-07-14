import { API_URL, ENVIRONMENT } from "constants/config";

export function Websocket(url, onmessage, onclose) {
  const host = API_URL.slice(API_URL.lastIndexOf("/") + 1);
  let ws_url = `ws://${host}/ws/${url}`;

  if (ENVIRONMENT === "production")
    ws_url = `wss://${window.location.host}/ws/${url}`;

  this.socket = new WebSocket(ws_url);

  this.socket.onmessage = function(e) {
    if (onmessage !== undefined) onmessage(e);
  };

  this.socket.onclose = function() {
    console.error(
      "Error while connecting in websocket! Trying to connect again in 5 seconds"
    );

    setTimeout(() => {
      console.info("Reconnecting...");

      if (onclose !== undefined) onclose();
    }, 5000);
  };
}
