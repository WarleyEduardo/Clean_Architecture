unit uIPresenter;

interface


uses  uresponse , ucliente , system.Generics.Collections,
 UVeiculo, uLocacao;

type

 Ipresenter = interface

  function ConverterResponse(response: Tresponse) : string;
  function Convertercliente (cliente : Tcliente ) : string;
  function ConverterVeiculo (veiculo : TVeiculo ) : string;
  function ConverterLocacao (locacao : TLocacao ) : string;

  function ConverterLista (Lista : TList<TObject>) : string;


 end;



implementation

end.
