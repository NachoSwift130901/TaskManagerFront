export interface ProjectBase {
    name: string;
}

export interface ProjectPayload extends ProjectBase {}

export interface Project extends ProjectBase {
    id: string;
}