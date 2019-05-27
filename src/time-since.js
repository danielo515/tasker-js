import distanceInWords from 'date-fns/distance_in_words_to_now';

export const timeSinceGlobal = globalName => distanceInWords(Number(tk.global(globalName)));

window.timeSinceGlobal = timeSinceGlobal;