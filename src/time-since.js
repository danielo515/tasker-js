import distanceInWords from "date-fns/distance_in_words_to_now";

const timeSince = str => distanceInWords(Number(str))
const timeSinceGlobal = globalName => distanceInWords(Number(global(globalName)))

window.timeSince = timeSince;
window.timeSinceGlobal = timeSinceGlobal;
