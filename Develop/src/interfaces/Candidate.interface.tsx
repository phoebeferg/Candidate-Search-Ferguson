// TODO: Create an interface for the Candidate objects returned by the API

export default interface Candidate {
    name: string,
    username: string,
    location: string,
    avatar: string,
    email: string,
    html_url: string,
    company: string
}