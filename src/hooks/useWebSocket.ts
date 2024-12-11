import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url: string) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      setLastMessage(event.data);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return { lastMessage };
};