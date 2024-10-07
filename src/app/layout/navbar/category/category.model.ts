import { IconName } from "@fortawesome/fontawesome-svg-core"

export type CategoryName = "TODO" | "INDIVIDUAL" | "DOBLE" | "MATRIMONIAL" | "TWIN" | "TRIPLE" | "FAMILIAR" | "CON VISTA AL MAR" | "DELUXE" | "ECO-FRIENDLY" | "CABAÑA" | "TEMÁTICA" | "CON BALCÓN" | "LOFT"

export interface Category {
    icon: IconName,
    displayName: String,
    technicalName: CategoryName,
    activated: boolean
}