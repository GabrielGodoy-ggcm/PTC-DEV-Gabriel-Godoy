import prisma from "@database"; //puxa o banco de dados do prisma
//busca todos os calcados de um tamanho
export const buscarTamanho = async (tamanho: number) => {
    return await prisma.calcado.findMany({
        where: { tamanho }, //filtra pelo tamanho
    });
};
//busca todos os calcados de uma certa marca
export const buscarMarca = async (marca: string) => {
    return await prisma.calcado.findMany({
        where: { marca }, //filtra pela marca
    });
};
//conta o total de pares cadastrados no estoque
export const contarTotalPares = async () => {
    return await prisma.calcado.count(); //o count() conta todos os registros da tabela
};