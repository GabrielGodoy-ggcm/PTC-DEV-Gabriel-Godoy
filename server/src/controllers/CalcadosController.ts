//CRUD
import { Request, Response } from "express"; //req = in resp= out
import prisma from "@database"; //puxa o banco de dados 
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