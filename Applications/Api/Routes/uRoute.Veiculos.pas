unit uRoute.Veiculos;

interface
uses Horse , uController.Veiculos;


procedure RouteVeiculo;

implementation

procedure RouteVeiculo;
begin

  // cadastrar

  Thorse.Post('/api/veiculo',postveiculo);

 // alterar

 Thorse.put('/api/veiculo/:id',putveiculo);

 // excluir

  Thorse.delete('/api/veiculo/:id',deleteveiculo);

 // consultar

   Thorse.get('/api/veiculos',getveiculos);

end;

end.
