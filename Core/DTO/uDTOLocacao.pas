unit uDTOLocacao;

interface

type

 DtoLocacao = record

    id            : integer;
    idcliente     : integer;
    Datalocacao   : Tdatetime;
    Datadevolucao : Tdatetime;
    Status        : string;

 end;

implementation

end.
