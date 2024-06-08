unit uIRepositoryLocacao;

interface

uses uLocacao, uDtoLocacao, system.Generics.Collections;

type

 IRepositoryLocacao = interface

  procedure Cadastrar(locacao : TLocacao);
  procedure Alterar(locacao : TLocacao);
  procedure Excluir(codigo : integer);
  Function Consultar(dto: DtoLocacao) :Tlist<TLocacao>;

 end;


implementation

end.
