import React, {Component} from "react"
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
 
    /* Obs.: Aqui estamos usando como extensão de Component por 2 razões:
        1. Usar o método de ciclo de vida do React.
        2. Trabalhar com estado (state).
    */

    state = {...initialState}

    componentDidMount(){
        //Isso será feito para carregar os elementos do JSON.server pela primeira vez no state
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })        
    }

    clear() {
        this.setState({user: initialState.user})
    }

    save() {
        /* Quando eu quero incluir, o usuário não tem id. Quando eu quero alterar, o id está setado. */
        const user = this.state.user
        const method = user.id ? 'put' : 'post' /*put altera, post inclui*/
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
        /*obs.: A estratégia é: conseguir a lista de usuário 1 única vez e depois somente atualizar e sincronizar com o backend.*/
    }

    getUpdatedList(user, add = true) {
        //1º vou pegar a lista com todos os usuários exceto o usuário que passei como parâmetro
        const list = this.state.list.filter( u => u.id !== user.id ) //o filter vai gerar uma nova lista pra a gente, não precisa clonar a que já temos
        //2º vou colocar o user passado como parâmetro na primeira posição da lista
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        //aqui vamos trabalhar com o formulário!
        const user = {...this.state.user} //criando clone
        //o que está [entre colchetes] é o atributo do user que eu estou acessando do state
        user[event.target.name] = event.target.value //esse é o valor que está dentro do campo de input
        this.setState({user})
    }

    renderForm() {
        //aqui vou colocar o jsx que renderiza o formulário. Depois haverá outra para renderizar a linha da tabela e outra para renderizar a linha da tabela
        return (
            <div className="form">
                <div className="row">

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name} 
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome...">
                            </input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail...">
                            </input>                            
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    /* col-12 = usar as 12 colunas. d-flex = display flex. justify-content-end = justificar os botoes pro final */

    load(user) {
        this.setState({user})
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
   }
}