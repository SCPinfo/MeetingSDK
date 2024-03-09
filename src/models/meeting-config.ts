export interface MeetingConfig {
    rateEnabled : boolean,
    dynamicAction : Action[]
}

interface Action {
    name: string, 
    url: string, 
    color: string,
    icon: string
}