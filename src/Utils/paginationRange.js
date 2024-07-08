import range from "./range";

export default function paginationRange(totalPage, page) {
  let leftSiblingsIndex = page;
  let rightSiblingsIndex = Math.min(page, totalPage);
  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;
  if (!showLeftDots && showRightDots) {
    let leftRange = range(1, 6);
    return [...leftRange];
  } else if (showLeftDots && !showRightDots) {
    let rightRange = range(page - 2, totalPage + 1);
    return [...rightRange];
  } else {
    let middleRange = range(leftSiblingsIndex - 2, rightSiblingsIndex + 3);
    return [...middleRange];
  }
}
