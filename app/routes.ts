import { Routes } from '@angular/router'

import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver
} from './events/index'

import { Error404Component } from './errors/404.component'

export const appRoutes : Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: EventsListComponent, resolve: {events: EventListResolver}},    
    { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]}, 
    { path: '404', component: Error404Component},
    { path: '', redirectTo: '/events', pathMatch: 'full'},  //prefix -> redirect if the URL starts with the specified path string
                                                            //full -> redirect if it fully matches the specified path string
    { path: 'user', loadChildren: 'app/user/user.module#UserModule'}    //have two parts: 1) path to the module - 2) after symbol "#" module name
]