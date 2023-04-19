const {
    connection
} = require('../server');

const path = (app) => {
    app.get('/abonnement', (req, res) => {
        connection.query('SELECT * FROM abonnement;',
            [],
            (err, results) => {
                if (err) throw err;
                res.json(results)
            })
    })

    app.get('/abonnement/:id', (req, res) => {
        let id_abonnement = req.params.id
        connection.query('SELECT * FROM abonnement WHERE id_abonnement = ?;',
            [id_abonnement], // requete preparé
            (err, results) => {
                if (err) throw err;
                res.json(results)
            })
    })
    
    app.get('/membre/:id', (req, res) => {
        let id_membre = req.params.id
        connection.query('SELECT * FROM membre WHERE id_membre = ?;',
            [id_membre], // requete preparé
            (err, results) => {
                if (err) throw err;
                res.json(results)
            })
    })

    app.post('/abonnement', (req, res) => {
        const {
            type,
            prix,
            bilan_IMC,
            acces_club
        } = req.body;
        console.log(req.body);
        connection.query('INSERT INTO abonnement (type, prix, bilan_IMC, acces_club) VALUES (?, ?, ?, ?) ;',
            [type, prix, bilan_IMC, acces_club], // requete preparé
            (err, results) => {
                if (err) throw err;
                res.json(results)
            })
    })

    app.patch('/abonnement/:id', (req, res) => {
        const id_abonnement = req.params.id;
        const nouveau_prix = req.body.prix;
      
        connection.query(
          'UPDATE abonnement SET prix = ? WHERE id_abonnement = ?',
          [nouveau_prix, id_abonnement],
          (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
              res.status(404).send('Abonnement non trouvé');
            } else {
              res.status(204).send('Prix de l\'abonnement mis à jour avec succès');
            }
          }
        );
      });
      
      

    app.delete('/abonnement/:id', (req, res) => {
            let id_abonnement = req.params.id;
            connection.query('DELETE FROM abonnement WHERE id_abonnement = ?',
                [id_abonnement],
                (err, result) => {
                    if (err) throw err;
                    if (result.affecetedRows === 0) {
                        res.status(404).send('Abonnement non trouvé');
                    } else {
                        res.status(200).send('Abonnement supprimé avec succés');
                    }
                }
            );
        }

    );
}

module.exports = path;