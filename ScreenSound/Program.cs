Musica musica1 = new Musica();
musica1.Nome = "Pescador de Ilusões";
musica1.Artista = "O Rappa";
musica1.Duracao = 273;
musica1.Disponivel = true;
Console.WriteLine(musica1.DescricaoResumida);

Musica musica2 = new Musica();
musica2.Nome = "Me deixa"; 
musica2.Artista = "O Rappa";
musica2.Duracao = 372;
musica2.Disponivel = false;


musica1.ExibirFichaTecnica();
musica2.ExibirFichaTecnica();