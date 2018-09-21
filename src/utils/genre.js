export function genre(items, genre) {
  if (genre !== "All Genres")
    return items.filter(item => item.genre.name === genre);
  return items;
}
