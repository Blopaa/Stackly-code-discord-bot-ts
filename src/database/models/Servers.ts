import { Document, model, Schema } from "mongoose"

export interface IServer extends Document {
    serverID: string,
    name?: string,
    bot?: {
        prefix: string
        color?: {
            primary: string
        }
    },
    channels?: {
        sugerencias: string,
        bienvenidas: string,
        advertisments: string
    },
    roles?: {
        warning: string,
        admin: string,
        invitado: string,
        everyone: string
    },
    categories?: {
        SOPORTE: string
    }
}

const serverSchema = new Schema({
    serverID: {
        type: String,
        required: true
    },
    name: String,
    bot: {
        prefix: String,
        color: {
            primary: String
        }
    },
    channels: {
        sugerencias: String,
        bienvenidas: String,
        advertisments: String
    },
    roles: {
        warning: String,
        admin: String,
        invitado: String,
        everyone: String
    },
    categories:{
        SOPORTE: String
    }
})

export default model<IServer>('Server', serverSchema)