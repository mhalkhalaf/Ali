import { IAcoountForCreation } from "./account-for-creation"

export class IAcoount implements IAcoountForCreation {
    username!: string
    password!: string
    role!: string
    id!: string
}