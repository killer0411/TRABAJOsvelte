import { writable, get } from "svelte/store";

export const transcripciones = writable();
export const transcripcioness = get(transcripciones);
