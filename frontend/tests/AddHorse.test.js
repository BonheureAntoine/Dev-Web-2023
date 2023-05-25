import { render, fireEvent, waitFor, act, screen } from '@testing-library/react';
import AddHorse from '../src/components/AddHorse';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { getByLabelText, getByText } from '@testing-library/react';
import {useEffect, useState} from 'react';
import parse from 'html-react-parser'

test('soumission réussie du formulaire', async () => {
    const mockData = [
        {"option":"<option id=\"1\" value=\"1\"> Antoine Bonheure </option>","source":"breeder"},
        {"option":"<option id=\"2\" value=\"2\"> Alexandra Vanneste </option>","source":"breeder"},
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
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
    });

    // Rendu du composant
    render(<AddHorse />);

    await act(() => new Promise((resolve) => setTimeout(resolve, 3000)));

    //await waitFor(() => expect(getByText('Ajouter')).toBeInTheDocument());

    const file = new File(['dummy content'], 'dummy.jpg', { type: 'image/jpeg' });

    // Simuler le changement du champ de fichier avec le fichier fictif
    /*act(() => {
    const fileInput = getByLabelText('Photo:');
    fireEvent.change(fileInput, { target: { files: [file] } });
    const changeEvent = {
        target: { files: [file] }
    };*/
    //fireEvent.change(fileInput, changeEvent);
    fireEvent.change(getByLabelText('Nom: *'), { target: { value: 'Mon cheval' } });
    fireEvent.click(getByLabelText('M'));
    fireEvent.change(getByLabelText('Date de naissance: *'), { target: { value: '2022-01-01' } });
    fireEvent.change(getByLabelText('Hauteur(cm): *'), { target: { value: '150' } });
    fireEvent.change(getByLabelText('Statut: *'), { target: { value: 'competition' } });
    fireEvent.change(getByLabelText('Besoins médicaux / Commentaire'), { target: { value: 'Besoin médical spécifique' } });
    fireEvent.change(getByLabelText('Race: *'), { target: { value: "1" } });
    fireEvent.change(getByLabelText('Eleveur:'), { target: { value: "null" } });
    fireEvent.change(getByLabelText('Robe: *'), { target: { value: "1" } });


    // Soumettre le formulaire
    act(() => {
        fireEvent.click(getByText('Ajouter'));
    });

    // Attendre que la requête soit terminée
    await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/horse/options');
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/horse/addHorse', {
            method: 'POST',
            body: JSON.stringify({
                photo: null,
                hname: "Mon cheval",
                gender: "male",
                birthdate: "2022-01-01",
                breed: 1,
                breeder: null,
                coat: 1,
                height: 150,
                statut: "competition",
                comment: "Besoin médical spécifique",
            }),
            //
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    });

    // Vérifier que le message de succès est affiché
    expect(getByText('Cheval ajouté avec succès à la base de données')).toBeInTheDocument();
});

