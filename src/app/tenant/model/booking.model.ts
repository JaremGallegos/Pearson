import { PrecioVO } from "../../landlord/model/listing-vo.model";
import { DisplayPicture } from "../../landlord/model/listing.model";


export interface BookedDatesDTOFromServer {
    startDate: Date;
    endDate: Date;
}

export interface BookedListing {
    location: string,
    cover: DisplayPicture,
    totalPrice: PrecioVO,
    dates: BookedDatesDTOFromServer,
    bookingPublicId: string,
    listingPublicId: string,
    loading: boolean
}