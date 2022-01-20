export interface Ticket {
    id?:                any;
    dateOuverture?:   string;
    dateFin?: string;
    priorite:      string;
    status:          string;
    titulo:          string;
    observacoes:     string;
    technicien:            any;
    cliente:            any;
    nomeCliente:     string;
    nomeTechnicien:     string;
}