//CRUD
import { Request, Response } from "express"; //req = in resp= out
import prisma from "@database"; //puxa o banco de dados 
import { buscarTamanho as buscarTamanhoREP, buscarMarca as buscarMarcaREP, contarTotalPares as contarTotalParesREP } from "../repositorie/CalcadosRepositorie"; //puxa as funçoes do repositories e o as eu usei para nao dar conflito entre as funçoes 
//create - cadastro dos calçados/sapato 
export const criarCalcado = async (req: Request, res: Response) => {
    try {
        const {nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body; //recebe os dados no body
        const calcado = await prisma.calcado.create({ //cria o calcado no banco de dados
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque,
            }
        });
        return res.status(201).json({
            message: "Sucesso no cadastro!",
            calcado,
        }); //retorna o calcado e a msg se tudo der certo graças as Deus
    } catch (error) {
        return res.status(400).json({
            message: "Erro no cadastro do calçado!",
            error,
        })
    }
};
//read - le os calcados cadastrados no prisma/banco de dados, é um get eu acho
export const lerCalcado = async (req: Request, res: Response) => {
    try {
        const calcados = await prisma.calcado.findMany(); //o findmany busca tudo registrado na tabela
        if (calcados.length === 0) { //verifica se a lista ta vazia, se ss ele da 404
            return res.status(404).json({
                message: "Nenhum calçado cadastrado aind!",
            });
        }
        return res.status(200).json(calcados); //deu tudo certo e ele mostra os dados
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar calçados!",
            error,
        });
    }
};
//update - atualiza os dados ja existentes de um calçado
export const atualizarCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; //pega o id pelo parametro/url
        const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body; //pega os dados enviados no body  
        const calcado = await prisma.calcado.update({ //da update(atualiza) os dados do calçado
            where: { id: Number(id) }, //number conver o id de str para int
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque,
            }
        });
        return res.status(200).json({ //mesma logica de deu certo e errado que to com preguiça de explicar dnv 
            message: "Calçado atualizado com sucesso!",
            calcado,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao atualizar calçado!",
            error,
        });
    }
};
//delete - apaga um calcado do banco de dados
export const deletarCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; //pega o id pela url /cacado/1
        await prisma.calcado.delete({
            where: { id: Number(id) },
        });
        return res.status(200).json({
            message: "Calçado deletado com sucesso!",
        });
    } catch (error) {
        return res.status(400).json({
            message: "Não foi possivel apagar o calçado!",
            error,
        });
    }
};
//DESAFIO EXTRA 
//busca calçados por tamanho
export const buscarTamanho = async (req: Request, res: Response) => {
    try {
        const { tamanho } = req.params; //pega o tamanho pela url
        const calcados = await buscarTamanhoREP(Number(tamanho)); //chama a função do repositorie
        if (calcados.length === 0) { //se nao achar nenhum calçado desse tamanho
            return res.status(404).json({message: "Nenhum calçado encontrado nesse tamanho!",
            });
        }
        return res.status(200).json(calcados); //retorna todos os calçads encontrados
    } catch (error) {
        return res.status(400).json({ //deu errado
            message: "Erro ao buscar por tamanho!",
            error,
        });
    }
};
//busca calçados por marca
export const buscarMarca = async (req: Request, res: Response) => {
    try {
        const { marca } = req.params; //pega a marca pela url
        const calcados = await buscarMarcaREP(marca); //chama a função do repositories
        if (calcados.length === 0) {
            return res.status(404).json({
                message: "Nenhum calçado encontrado dessa marca!",
            });
        }
        return res.status(200).json(calcados); //manda todos os que foram encontrados com aquela marca
    } catch (error) {
        return res.status(400).json({ //erro
            message: "Erro ao buscar por marca!",
            error,
        });
    }
};
//conta o total de pares no estoque
export const contarPares = async (req: Request, res: Response) => {
    try {
        const total = await contarTotalParesREP(); //chama a função do repositories
        return res.status(200).json({ //deu certo e contou o total
            message: `Total de pares no estoque: ${total}`, //mostra o numero total, tem que colocar um $ antes do total, 30min para descobrir o erro e era isso :(
            total,
        });
    } catch (error) {
        return res.status(400).json({ //deu erro
            message: "Erro ao contar pares!",
            error,
        });
    }
};