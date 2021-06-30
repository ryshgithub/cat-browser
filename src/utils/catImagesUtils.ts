import { CatImageList } from "../containers/HomePage/interface";

/** The pagination of the API does not have any indicator if we got the last page.
 * With that we need to compare the old and new response and see if there are new
 * images on it. If yes, then we will use those new images.
*/
export const getNewCatImagesFromNewResults = (currentCatImageList: CatImageList, newCatImageList: CatImageList) => {
    const currentCatImageIDs = currentCatImageList.map(catImage => catImage.id);
    
    return newCatImageList.filter(({ id }) => !currentCatImageIDs.includes(id));
}