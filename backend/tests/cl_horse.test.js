const axios = require('axios');

// Configurez l'URL de base de votre API
axios.defaults.baseURL = 'http://localhost:3001/api/horse';


test('Test de la récupération des options', async () => {
    // Effectuez une requête GET à l'endpoint de votre API
    const response = await axios.get('/options');

    // Vérifiez si la réponse contient les données attendues
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.data).toEqual([
        {"option":"<option id=\"1\" value=\"1\"> Antoine Bonheure </option>","source":"breeder"},
        {"option":"<option id=\"2\" value=\"2\"> Alexandra  Vanneste </option>","source":"breeder"},
        {"option":"<option id=\"1\" value=\"1\"> arabe </option>","source":"breed"},
        {"option":"<option id=\"2\" value=\"2\"> frison </option>","source":"breed"},
        {"option":"<option id=\"3\" value=\"3\"> pur-sang </option>","source":"breed"},
        {"option":"<option id=\"4\" value=\"4\"> shetland </option>","source":"breed"},
        {"option":"<option id=\"5\" value=\"5\"> trotteur </option>","source":"breed"},
        {"option":"<option id=\"1\" value=\"1\"> alezan </option>","source":"coat"},
        {"option":"<option id=\"2\" value=\"2\"> aubère </option>","source":"coat"},
        {"option":"<option id=\"3\" value=\"3\"> bai </option>","source":"coat"},
        {"option":"<option id=\"4\" value=\"4\"> blanc </option>","source":"coat"},
        {"option":"<option id=\"5\" value=\"5\"> crème </option>","source":"coat"},
        {"option":"<option id=\"6\" value=\"6\"> gris </option>","source":"coat"},
        {"option":"<option id=\"7\" value=\"7\"> isabelle </option>","source":"coat"},
        {"option":"<option id=\"8\" value=\"8\"> noir </option>","source":"coat"},
        {"option":"<option id=\"9\" value=\"9\"> palomino </option>","source":"coat"},
        {"option":"<option id=\"10\" value=\"10\"> pie </option>","source":"coat"},
        {"option":"<option id=\"11\" value=\"11\"> rouan </option>","source":"coat"},
        {"option":"<option id=\"12\" value=\"12\"> souris </option>","source":"coat"},
        {"option":"<option id=\"13\" value=\"13\"> tacheté </option>","source":"coat"}
    ]);
});


test('Test de l\'ajout d\'un cheval valide', async () => {
    // Définissez les données de l'utilisateur à ajouter
    const data = {
        photo: null,
        hname: "ert",
        gender: "male",
        birthdate: "10-10-2010",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 180,
        statut: "elevage",
        comment: "",
    };

    // Effectuez la requête POST à l'endpoint de votre API pour ajouter un utilisateur
    const response = await axios.post('/', data);

    // Vérifiez si la réponse contient les données attendues
    expect(response.status).toBe(201); // Statut 201 pour la création réussie
});

test('Test de l\'ajout d\'un cheval - Photo invalide (format)', async () => {
    const data = {
        photo: 185, // Photo invalide (nom de fichier incorrect)
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'photo',
                message: "Le format de la photo est invalide",
            },
        ]);
    }
});

test('Test de l\'ajout d\'un cheval - Photo invalide (taille)', async () => {
    const data = {
        photo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat risus sit amet diam auctor, vel vestibulum ex interdum. Sed vel ultricies leo. Duis aliquam lacus eget ligula gravida ullamcorper. Quisque in risus sit amet metus luctus malesuada. Donec mollis faucibus gravida. Morbi commodo sapien nec justo finibus, in luctus lacus hendrerit. Nunc eget fermentum eros. Fusce placerat dui sit amet leo maximus tincidunt. Etiam pellentesque turpis elit, eu hendrerit nisi vestibulum a. Nunc rutrum euismod lorem, id dignissim lorem lacinia in. In malesuada ligula ut dapibus placerat. Suspendisse nec aliquam massa. Maecenas non bibendum ipsum, in lacinia lacus. Fusce dignissim turpis a eleifend egestas. Vivamus venenatis ipsum a nisi dictum, et aliquet odio lacinia.", // Photo invalide (taille >500)
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'photo',
                message: "Photo invalide: Le nom du fichier ne peut pas dépasser 500 caractères",
            },
        ]);
    }
});


test('Test de l\'ajout d\'un cheval - Date de naissance invalide (structure date invalide)', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "30-02-2023", // Date invalide
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'birthdate',
                message: "Le format de la date est invalide",
            },
        ]);
    }
});

test('Test de l\'ajout d\'un cheval - Date de naissance invalide (futur)', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "2023-09-24", // Date de naissance dans le futur
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'birthdate',
                message: "Date invalide: La date de naissance du cheval ne peut pas être dans le futur",
            },
        ]);
    }
});

test('Test de l\'ajout d\'un cheval - Date de naissance invalide (format invalide)', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: 125, // Date de naissance format invalide
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'birthdate',
                message: "Le format de la date est invalide",
            },
        ]);
    }
});


test('Test de l\'ajout d\'un cheval - Nom invalide (<1)', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "", // Nom invalide (longueur inférieure à 1 caractère)
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'hname',
                message: "Nom invalide: Le nom du cheval doit contenir entre 1 et 100 caractères",
            },
        ]);
    }
});

test('Test de l\'ajout d\'un cheval - Nom invalide (format invalide)', async () => {
    const data = {
        photo: "horse.jpg",
        hname: 5, // Nom manquant
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'hname',
                message: "Le format du nom est invalide",
            },
        ]);
    }
});



test('Test de l\'ajout d\'un cheval - Taille invalide (format invalide)', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: "abc", // Taille invalide
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'height',
                message: "Le format de la taille est invalide",
            },
        ]);
    }
});

test('Test de l\'ajout d\'un cheval - Taille invalide > 300cm', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 600, // Taille invalide
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'height',
                message: "Taille invalide: La taille du cheval ne peut pas dépasser 300 cm ou être négative",
            },
        ]);
    }
});

test('Test de l\'ajout d\'un cheval - Taille invalide > 300cm', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: -1, // Taille invalide
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'height',
                message: "Taille invalide: La taille du cheval ne peut pas dépasser 300 cm ou être négative",
            },
        ]);
    }
});

test('Test de l\'ajout d\'un cheval - Commentaire invalide (format invalide)', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: 12345, // Commentaire invalide
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'comment',
                message: "Le format du commentaire est invalide",
            },
        ]);
    }
});


test('Test de l\'ajout d\'un cheval - Race invalide', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: "abc", // Race invalide
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'breed',
                message: "Le format de la race est invalide",
            },
        ]);
    }
});


test('Test de l\'ajout d\'un cheval - Coat invalide', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: "abc", // Coat invalide
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: "coat",
                message: "Le format de la robe est invalide",
            },
        ]);
    }
});


test('Test de l\'ajout d\'un cheval - Éleveur invalide', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: "John Doe", // Éleveur invalide
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'breeder',
                message: "Le format de l'éleveur est invalide",
            },
        ]);
    }
});


test('Test de l\'ajout d\'un cheval - Format de statut invalide', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "male",
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "unknown", // Format de statut invalide
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'statut',
                message: "La valeur/format du statut est invalide",
            },
        ]);
    }
});


test('Test de l\'ajout d\'un cheval - Format de sexe invalide', async () => {
    const data = {
        photo: "horse.jpg",
        hname: "Cheval Test",
        gender: "unknown", // Format de sexe invalide
        birthdate: "01-01-2015",
        breed: 1,
        breeder: null,
        coat: 1,
        height: 150,
        statut: "elevage",
        comment: "Lorem ipsum dolor sit amet.",
    };

    await expect(axios.post('/', data)).rejects.toThrow();

    try {
        await axios.post('/', data);
    } catch (error) {
        expect(error.response.status).toBe(422);
        expect(error.response.data.errors).toEqual([
            {
                field: 'gender',
                message: "La valeur/format du sexe est invalide",
            },
        ]);
    }
});