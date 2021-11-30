import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Card } from 'src/app/models/card.model';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private REST_API_SERVER = 'https://glaubs-kanban-backend.vercel.app';

  constructor(private httpClient: HttpClient) {}

  cards!: Card[];
  authorization: string = localStorage.getItem('auth') || '';
  headers = {
    'Content-Type': 'application/json',
    Authorization: this.authorization,
  };

  cardsChanged = new Subject();
  isLogged = new Subject();

  getAuthorizationToken(login: string, senha: string) {
    const url = this.REST_API_SERVER + '/login/';
    const msgBody = { login: login, senha: senha };
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers: headers };
    const response = this.httpClient.post<string>(url, msgBody, options);
    return response;
  }

  setAuth(auth: string) {
    this.authorization = 'Bearer ' + auth;
    localStorage.setItem('auth', this.authorization);
    this.isLogged.next(true);
  }

  clearAuth() {
    this.authorization = '';
    localStorage.removeItem('auth');
    this.isLogged.next(true);
  }

  getAllCards() {
    const url = this.REST_API_SERVER + '/cards/';
    const options = { headers: this.headers };
    const res = this.httpClient.get<Card[]>(url, options);
    return res;
  }

  createNewCard(titulo: string, conteudo: string, lista: string) {
    let card = new Card(titulo, conteudo, lista, '');
    const url = this.REST_API_SERVER + '/cards/';
    const options = { headers: this.headers };
    const response = this.httpClient.post<Card[]>(url, card, options);
    return response;
  }

  changeCardById(id: string, titulo: string, conteudo: string, lista: string) {
    const url = this.REST_API_SERVER + '/cards/' + id;
    const options = { headers: this.headers };
    const response = this.httpClient.put<Card[]>(
      url,
      { id, titulo, conteudo, lista },
      options
    );
    return response;
  }

  deleteCardById(id: string) {
    const url = this.REST_API_SERVER + '/cards/' + id;
    const options = { headers: this.headers };
    const response = this.httpClient.delete(url, options);
    return response;
  }
}
