import axios from 'axios'

const BASE_URL = 'http://localhost:4000/api/v1'

export const getTodos = () => {
    return call('GET', '/todos')
}

export const addTodo = async (task) => {
    return call('POST', '/todos', { task: task })
}

export const updateTodo = async (todoId, task, is_completed = false) => {
    return call('PUT', `/todos/${todoId}`, { task, is_completed })
}

export const deleteTodo = async (todoId) => {
    return call('DELETE', `/todos/${todoId}`)
}


/**
 * Makes an API call. Returns a promise with  { status, error, payload }
 * status is the HTTP status code
 * error is a best effort at a map containing a message or sometimes validation messages
 * payload is the json payload if the call is successful
 *
 * @param {*} method GET, PUT,... GET is the default
 * @param {*} url Relative endpoint of the API. Don't forget a leading slash (e.g. /users)
 * @param {*} params Optional parameters
 * @param {*} ignoreCodes HTTP status codes to ignore (see generateHelper)
 * @return A promise that never fails and returns { status, error, payload }
 */

function call(method, url, params, ignoreCodes) {
    const x = BASE_URL;
    const fullUrl = x + url
    const axiosParams = {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    if (params) {
        if (axiosParams.method === 'GET') {
            axiosParams.params = params
        } else {
            axiosParams.data = params;
        }
    }

    return axios(fullUrl, axiosParams)
        .then(generateHelper(ignoreCodes))
        .catch(error => {
            let status = error.response.status
            let errorMsg = error.response.data.error
            const value = { payload: null, status: status };
            switch (status) {
                case 422:
                    //field validation failed
                    Object.assign(value, { error: { message: errorMsg } })
                    break
                case 400:
                    // bad request
                    Object.assign(value, { error: { message: 'Can not process your request.' } });
                    break;
                case 401:
                    // unauthorized
                    Object.assign(value, { error: { message: errorMsg } });
                    break;
                case 404:
                    // No records found
                    Object.assign(value, { error: { message: errorMsg } });
                    break;
                default:
                    Object.assign(value, { error: { message: 'Check your internet connection.' } });
                    break;
            }
            return value
        });
}

/**
 * Generate a function to handle responses
 * Pass HTTP status codes (array) that you want to process in the caller
 * @param {*} ignoreCodes
 */
function generateHelper(ignoreCodes) {
    return (response) => {
        const status = response.status;
        if ((ignoreCodes && ignoreCodes.indexOf(status) > -1) || (status >= 200 && status < 300)) {
            return {
                payload: response.data.data,
                status: status
            };
        }
    };
}