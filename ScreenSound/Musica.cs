class Musica
{
    public string Nome {  get; set; }
    public string Artista { get; set; }
    public int Duracao { get; set; }
    
    //GET e Set são propriedades
    public bool Disponivel { get; set; }

    //GET utilizando Lambda
    public string DescricaoResumida => $"A música {Nome} pertence a banda {Artista}";


    public void ExibirFichaTecnica()
    {
        Console.WriteLine($"Nome: {Nome}");
        Console.WriteLine($"Artista: {Artista}");
        Console.WriteLine($"Duração: {Duracao}");
        Console.WriteLine(Disponivel ? "Música disponível no plano" : "Adquira o plano Plus+");
    }
}