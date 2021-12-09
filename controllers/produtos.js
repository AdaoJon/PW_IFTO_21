 const knex = require("../database/connection");

   const findALL = async (req, res) => {
   const produtos = await knex("produtos");
   const result = produtos.map((produto) => {
       produto.imagem = process.env.HOST + "/" + produto.imagem;
   return produto;
   });
      res.json(result);
  };

  const findOne = async (req, res) => {
     const produtos = await knex("produtos").where( {id: req.params.id }); 
      const result = produtos.map((produto) => { 
      produto.imagem = process.env.HOST + "/" + produto.imagem;
      return produto;
      });
    res.json(result);
    
  };

  const create = async (req, res) => {
      const produto = { ...req.body };
      produto.imagem = req.file.path;
   
      const result = await knex("produtos").insert (produto);
      res.json(result)
  };

  const update = async (req, res) => {
   const result = await knex("produtos")
   .where({ id: req.params.id } )
   .update(req.body);
      res.json(result);
  };

  const destroy = async (req, res) => {
   const result = await knex("produtos")
   .where({ id: req.params.id } )
   .del();
      res.json(result);
  };
  module.exports = {findALL, findOne, create, update, destroy };
  