// login

export interface loginData {
    correo: string,
    password: string,
    nombre?: string,
    rol?: string,
}

// user

export interface LoginResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    rol:    string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid:    string;
    img?: string;
}

// products

export interface productsResponse {
    total:     number;
    productos: Producto[];
}

export interface Producto {
    precio:    number;
    _id:       string;
    nombre:    string;
    categoria: Categoria;
    usuario:   Categoria;
    img?:      string;
}

export interface Categoria {
    _id:    string;
    nombre: string;
}

// cathegorys

export interface CathegorysResponse {
    total:      number;
    categorias: CategoriaFull[];
}

export interface CategoriaFull {
    _id:     string;
    nombre:  string;
    usuario: UsuarioCreador;
}

export interface UsuarioCreador {
    _id:    string;
    nombre: string;
}


