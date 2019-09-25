import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private request: ApiRequestService) { }

  register = {
    post: (country) => this.request
      .post(country)
      .url('/api/v1.0/auth/users/create')
  };

  authLogin = {
    post: (email, password) => this.request
      .post({email: email, password: password})
      .url('/api/v1.0/auth/jwt/create'),
    logout: () => this.request
      .delete()
      .url('/api/v1.0/auth/users/jwt/create/')
      .auth(),
  };

  login = {
    post: (auth) => this.request
      .post(auth)
      .url('/api/v1.0/auth/users/jwt/create/'),
  };

  activeUser = {
    post: (auth) => this.request
      .post(auth)
      .url('/api/v1.0/auth/users/activate/'),
  };

  me = {
    get: () => this.request
      .get()
      .url('/api/v1.0/auth/me')
      .auth(),
    getAll: () => this.request
      .get()
      .url('/api/v1.0/auth/users')
      .auth(),
    put: (me) => this.request
      .put()
      .url('/api/v1.0/auth/users/me/')
      .payload(me)
      .auth(),
    resetPassword: (auth) => this.request
      .post(auth)
      .url('/api/v1.0/auth/password')
      .auth(),
    location: (log) => this.request
      .post(log)
      .url('/api/v1.0/history/entity')
      .auth(),
  };

  history = {
    get: () => this.request
      .get()
      .url('/api/v1.0/history/list')
      .auth(),
  };


  updateProfile = {
    put: (user) => this.request
        .put()
        .url('/api/v1.0/auth/profile/update/{}/', user.id)
        .payload(user)
        .auth(),
    resetPwd: (pwd) => this.request
        .put()
        .url('/api/v1.0/auth/profile/resetpwd/')
        .payload(pwd)
        .auth(),
  };

  customer = {
    get: () => this.request
      .get()
      .url('/api/v1.0/customer/entity')
      .auth(),
    searchByArg: () => this.request
      .get()
      .url('/api/v1.0/customer/search')
      .auth(),
    post: (country) => this.request
      .post(country)
      .url('/api/v1.0/customer/entity')
      .auth(),
    update: (customer) => this.request
      .put()
      .url('/api/v1.0/customer/{}/update', customer.id)
      .payload(customer)
      .auth(),
    delete: (id) => this.request
      .delete()
      .url('/api/v1.0/customer/{}/delete', id)
      .auth(),
  };

  product = {
    get: () => this.request
      .get()
      .url('/api/v1.0/product/entity')
      .auth(),
    searchByArg: () => this.request
      .get()
      .url('/api/v1.0/product/search')
      .auth(),
    post: (product) => this.request
      .post(product)
      .url('/api/v1.0/product/entity')
      .auth(),
    update: (product) => this.request
      .put()
      .url('/api/v1.0/product/{}/update', product.id)
      .payload(product)
      .auth(),
     delete: (id) => this.request
      .delete()
      .url('/api/v1.0/product/{}/delete', id)
      .auth(),
  };

  variation = {
    get: (id) => this.request
      .get()
      .url('/api/v1.0/product/{}/variations', id)
      .auth(),
  };

  order = {
    get: () => this.request
      .get()
      .url('/api/v1.0/order/entity')
      .auth(),
    getOrder: (id) => this.request
      .get()
      .url('/api/v1.0/order/{}/edit', id)
      .auth(),
    getAmount: () => this.request
      .get()
      .url('/api/v1.0/order/amount')
      .auth(),
    post: (order) => this.request
      .post(order)
      .url('/api/v1.0/order/entity')
      .auth(),
    update: (order) => this.request
      .put()
      .url('/api/v1.0/order/{}/update', order.id)
      .payload(order)
      .auth(),
     delete: (id) => this.request
      .delete()
      .url('/api/v1.0/order/{}/delete', id)
      .auth(),
  };

  company = {
    get: () => this.request
      .get()
      .url('/api/v1.0/company/entity')
      .auth(),
    getStuffByCompanyId: (id) => this.request
      .get()
      .url('/api/v1.0/company/entity/{}/stuff', id)
      .auth(),
    invite: (email) => this.request
      .post(email)
      .url('/api/v1.0/email/invitation')
      .auth(),
    post: (stuff) => this.request
      .post(stuff)
      .url('/api/v1.0/company/entity')
      .auth(),
    update: (product) => this.request
      .put()
      .url('/api/v1.0/company/{}', product.id)
      .payload(product)
      .auth(),
     delete: (id) => this.request
      .delete()
      .url('/api/v1.0/company/{}', id)
      .auth(),
  };

  countries = {
    get: () => this.request
      .get()
      .url('/api/v1.0/countries')
      .auth(),
    post: (country) => this.request
      .post(country)
      .url('/api/v1.0/countries')
      .auth(),
    list: () => this.request
      .get()
      .url('/api/v1.0/countries')
      .auth(),
    put: (country) => this.request
      .put()
      .url('/api/v1.0/countries/{}', country.id)
      .payload(country)
      .auth(),
     index: (id) => this.request
      .get()
      .url('/api/v1.0/countries/{}', id)
      .auth(),
  };

  users = {
    post: (user) => this.request
      .post(user)
      .url('/api/v1.0/users')
      .auth(),
    list: () => this.request
      .get()
      .url('/api/v1.0/users')
      .auth(),
    get: (id) => this.request
      .get()
      .url('/api/v1.0/users/{}', id)
      .auth(),
    put: (user) => this.request
      .put()
      .url('/api/v1.0/users/{}', user.id)
      .payload(user)
      .auth(),
    putPassword: (id, password) => this.request
      .put()
      .url('/api/v1.0/users/{}/password', id)
      .payload({password})
      .auth(),
    count: () => this.request
      .get()
      .url('/api/v1.0/users/count')
      .auth(),
    addPlace: (data, id) => this.request
      .post(data)
      .url('/api/v1.0/users/{}/places', id)
      .auth(),
    setActiveUserPlace: (data, user_id) => this.request
      .put()
      .url('/api/v1.0/users/{}/places', user_id)
      .payload(data)
      .auth()
  };

  userAccesses = {
    list: (user) => this.request
      .get()
      .url('/api/v1.0/users/{}/accesses', user.id)
      .auth(),
  };

  accessCodes = {
    post: (access) => this.request
      .post(access)
      .url('/api/v1.0/accesscodes')
      .auth(),
    put: (access) => this.request
      .put()
      .url('/api/v1.0/accesscodes/{}', access.id)
      .payload(access)
      .auth(),
    getByPlaceByUser: (user_id, place_id, access_type) => this.request
      .get()
      .url('/api/v1.0/users/{}/places/{}/accesses/{}', user_id, place_id, access_type)
      .auth(),
    affiliate: (data) => this.request
      .post(data)
      .url('/api/v1.0/accesscodes/affiliate')
      .auth(),
  };

  places = {
    post: (place) => this.request
      .post(place)
      .url('/api/v1.0/places')
      .auth(),
    list: () => this.request
      .get()
      .url('/api/v1.0/places')
      .auth(),
    get: (id) => this.request
      .get()
      .url('/api/v1.0/places/{}', id)
      .auth(),
    put: (place) => this.request
      .put()
      .url('/api/v1.0/places/{}', place.id)
      .payload(place)
      .auth(),
  };

  hubs = {
    list: () => this.request
      .get()
      .url('/api/v1.0/hubs')
      .auth(),
    get: (id) => this.request
      .get()
      .url('/api/v1.0/hubs/{}', id)
      .auth(),
    post: (hub) => this.request
      .post(hub)
      .url('/api/v1.0/hubs')
      .auth(),
    newpass: (hub_id, passkey) => this.request
      .put()
      .url('/api/v1.0/hubs/passkey/{}', hub_id)
      .payload(passkey)
      .auth(),
    put: (hub) => this.request
      .put()
      .url('/api/v1.0/hubs/{}', hub.id)
      .payload(hub)
      .auth(),
  };

  checkpoints = {
    list: () => this.request
      .get()
      .url('/api/v1.0/checkpoints')
      .auth(),
    get: (id) => this.request
      .get()
      .url('/api/v1.0/checkpoints/{}', id)
      .auth(),
    post: (checkpoint) => this.request
      .post(checkpoint)
      .url('/api/v1.0/checkpoints')
      .auth(),
    put: (checkpoint) => this.request
      .put()
      .url('/api/v1.0/checkpoints/{}', checkpoint.id)
      .payload(checkpoint)
      .auth(),
    delete: (checkpoint_id) => this.request
      .delete()
      .url('/api/v1.0/checkpoints/{}', checkpoint_id)
      .auth(),
  };

  sensors = {
    list: () => this.request
      .get()
      .url('/api/v1.0/sensors')
      .auth(),
    get: (id) => this.request
      .get()
      .url('/api/v1.0/sensors/{}', id)
      .auth(),
    post: (sensor) => this.request
      .post(sensor)
      .url('/api/v1.0/sensors')
      .auth(),
    put: (sensor) => this.request
      .put()
      .url('/api/v1.0/sensors/{}', sensor.id)
      .payload(sensor)
      .auth(),
    delete: (sensor_id) => this.request
      .delete()
      .url('/api/v1.0/sensors/{}', sensor_id)
      .auth(),
  };

  checkins = {
    list: () => this.request
      .get()
      .url('/api/v1.0/checkins')
      .auth(),
    count: () => this.request
      .get()
      .url('/api/v1.0/checkins/count')
      .auth(),
    countperday: () => this.request
      .get()
      .url('/api/v1.0/checkins/countperday')
      .auth(),
  };

  batches = {
    list: () => this.request
      .get()
      .url('/api/v1.0/batches')
      .auth(),
    post: (batch) => this.request
      .post(batch)
      .url('/api/v1.0/batches')
      .auth(),
    upload: (files, data) => this.request
      .upload(files, data)
      .url('/api/v1.0/batches/upload')
      .auth(),
  };

  logs = {
    list: () => this.request
      .get()
      .url('/api/v1.0/logs')
      .auth(),
  };

  doc = {
    get: () => this.request
      .get()
      .url('/api/v1.0/doc')
      .auth(),
  };

  dbschema = {
    get: () => this.request
      .get()
      .url('/api/v1.0/schema')
      .auth(),
  };

  roles = {
    list: () => this.request
      .get()
      .url('/api/v1.0/roles')
      .auth(),
  };

}
