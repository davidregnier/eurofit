const {
    connection
} = require('../server');

const path = (app) => {
    app.get('/membre', (req, res) => {
        connection.query('SELECT * FROM membre;',
            [],
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
                console.log('test');
                res.json(results)
            })
    })

    app.post('/membre', (req, res) => {
        const {
            type,
            prix,
            bilan_IMC,
            acces_club
        } = req.body;
        console.log(req.body);
        connection.query('INSERT INTO membre (type, prix, bilan_IMC, acces_club) VALUES (?, ?, ?, ?) ;',
            [type, prix, bilan_IMC, acces_club], // requete preparé
            (err, results) => {
                if (err) throw err;
                res.json(results)
            })
    })

    app.patch('/membre/:id', (req, res) => {
        const id_membre = req.params.id;
        const nouveau_prix = req.body.prix;
      
        connection.query(
          'UPDATE membre SET prix = ? WHERE id_membre = ?',
          [nouveau_prix, id_membre],
          (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
              res.status(404).send('membre non trouvé');
            } else {
              res.status(204).send('Prix de l\'membre mis à jour avec succès');
            }
          }
        );
      });
      
      

    app.delete('/membre/:id', (req, res) => {
            let id_membre = req.params.id;
            connection.query('DELETE FROM membre WHERE id_membre = ?',
                [id_membre],
                (err, result) => {
                    if (err) throw err;
                    if (result.affecetedRows === 0) {
                        res.status(404).send('membre non trouvé');
                    } else {
                        res.status(200).send('membre supprimé avec succés');
                    }
                }
            );
        }

    );
}

module.exports = path;