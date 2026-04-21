"use client";

import { useState, useEffect, useCallback } from "react";

const KEY = "friendr_friends";

function loadFriends(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useFriends() {
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    setFriends(loadFriends());
  }, []);

  const isFriend = useCallback((id: string) => friends.includes(id), [friends]);

  const addFriend = useCallback((id: string) => {
    const updated = [...loadFriends().filter((f) => f !== id), id];
    localStorage.setItem(KEY, JSON.stringify(updated));
    setFriends(updated);
  }, []);

  const removeFriend = useCallback((id: string) => {
    const updated = loadFriends().filter((f) => f !== id);
    localStorage.setItem(KEY, JSON.stringify(updated));
    setFriends(updated);
  }, []);

  return { friends, isFriend, addFriend, removeFriend };
}
