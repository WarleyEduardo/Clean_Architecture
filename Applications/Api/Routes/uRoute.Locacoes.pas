unit uRoute.Locacoes;

interface

uses horse , uController.locacoes;

procedure RouteLocacao;

implementation

procedure RouteLocacao;
begin


 // cadastrar

  Thorse.Post('/api/locacao',postlocacao);

 // alterar

   Thorse.put('/api/locacao/:id',putlocacao);

 // excluir

  Thorse.delete('/api/locacao/:id',deletelocacao);

 // consultar

   Thorse.get('/api/locacoes',getlocacoes);

end;


end.
