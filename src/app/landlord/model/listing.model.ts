import { BanoVO, CamaVO, CuartoVO, DescripcionVO, HuespedVO, PrecioVO, TituloVO } from "./listing-vo.model";
import { CategoryName } from "../../layout/navbar/category/category.model";
import { NewListingPicture } from "./picture.model";

export interface NewListingInfo  {
    guests: HuespedVO,
    bedrooms: CuartoVO,
    beds: CamaVO,
    baths: BanoVO
}

export interface NewListing {
    category: CategoryName,
    location: string,
    infos: NewListingInfo,
    pictures: Array<NewListingPicture>,
    description: Description,
    price: PrecioVO
}

export interface Description {
    title: TituloVO,
    description: DescripcionVO
}

export interface CreatedListing {
    publicId: string
}

export interface DisplayPicture {
    file?: string,
    fileContentType?: string,
    isCover?: boolean
}

export interface CardListing {
    price: PrecioVO,
    location: string,
    cover: DisplayPicture,
    bookingCategory: CategoryName,
    publicId: string,
    loading: boolean
}

export interface Listing {
    description: Description,
    pictures: Array<DisplayPicture>,
    infos: NewListingInfo,
    price: PrecioVO,
    category: CategoryName,
    location: string,
    landlord: LandlordListing
}

export interface LandlordListing {
    firstname: string,
    imageUrl: string
}