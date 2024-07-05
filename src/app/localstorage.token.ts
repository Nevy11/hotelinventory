import { InjectionToken } from "@angular/core";

export const LocalStorageToken = new InjectionToken<any>('local storage', {
    providedIn: 'root',
    factory(){
        if (typeof localStorage !=='undefined'){
            return localStorage
        }
        else{
            return {
                getItem: (key: string) => null,
                setItem: (key: string, value: string) => {},
                removeItem: (key: string) => {},
                clear: () => {}
            }
        }
    }
})