const axios = require("axios");
const { writeFileSync } = require('fs')
const path = require('path')
const { createInterface } = require('readline')
// Ganti dengan cookie sesi Instagram kamu
/**
 * 
 * @param {string} username 
 * @returns {Promise<{
 *  username: string,
 *  full_name: string,
 *  pk: number,
 *  is_verified: boolean,
 *  search_social_context: string,
 *  profile_pic_url: string,
 *}>}
 */
const getUser = async username => {
    const url = 'https://www.instagram.com/graphql/query';
    const cookie = 'ps_n=1; ps_l=1; ig_did=79E6920E-2047-40A0-BBEB-3E96B8DF9955; ig_nrcb=1; mid=Zk9vXAABAAF8OJnil3UJbiqwQ1qY; datr=XG9PZkltcTH_51diD_KVhya3; fbm_124024574287414=base_domain=.instagram.com; csrftoken=a1do2jZYcQjNbKL8E3A78L8gDISHyC3C; ds_user_id=8616935667; dpr=1.7000000476837158; shbid="5535\\0548616935667\\0541751110778:01f728aeba7d9790b5b7b74132c8fdf0d1923ff880561f4df809d8449f45bc9e9b3aeda3"; shbts="1719574778\\0548616935667\\0541751110778:01f7055924908b323c125368dccf5ebafdc92ca7a2023fbcd6a5c91c14553a75daa85ffe"; sessionid=8616935667%3AaiOqJOFNYZ8bHc%3A21%3AAYeU4z5_uA_6nXwCwH-Y8YR35z_N1cT53yzGjtLcig; wd=424x809; rur="CCO\\0548616935667\\0541751116502:01f7c88b4b559b8332954235a7648c88b9be77d8ab1c54fb82e843655a366e67e42bc072"; fbsr_124024574287414=CkHMsZAugEkMdQ19rmXG2i_gtcvgRbp2R5AzAAQ8udw.eyJ1c2VyX2lkIjoiMTAwMDI1MzMwNjM5NTM2IiwiY29kZSI6IkFRQnFoN1d0UGNGbURzU3FQdG1WMUFqY0RaVDdDcVpocXJPRW5NRGI1cW02UXNvTVVTS2RjVGpnbXVHWmthMnM4WFVvenpMUmJORjR5MDJSSXJabndYLVRpTjl4ZUxCU20zTjVrTTFDSUVyZ0gzSS1UN2dZY0dwdmRVX29OY3pqdjFpVjA0ZWFaVU1RZHlJSERhWkhqZmR1RjNQZWVGVEF6TnpteGtBTC1MVnk0XzNYMWo4aUhGNnhUdUpPUVkyZXIzWXBQX0xaMHdlbVZxUldlUDFsMlZlbkk5ZktBcXV5UVNENFNxRHQtYUV4WDJpc19wb2JMa0RTa2ZHaU5tOEtES0JoU3ZQbG5kX01lWWVkS1c0cXpCelNOY0hNNHI0YVl2clQ4QjJpNU1XUFVZVGRfeTI5QzYzNzlwZEs5NHRvSVNtNktMRFZQMXhLb2ZVYzB4WXdDQkZiIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCT1pCWENTWkJLdXhCWkJqc0JwcHZWREl2U2piRVBHeUdTS0cwbjZiNVZ2SktzVW5BeEZ6SjR3dDNXREhLcmthYXNaQ3VVZHVVV1ZNN3U1T3NZd0c2Mkg0Z2lGb2tyZW16MEFEWkF3eVRibVVqZ043bHRzMVhHekhLbDh5UDZZQWh5ODhxWTRROWJQVXZVdFhGcjNXZ0QzWU92d2REempaQWJZdmNzT0VsN1pCazEzdzJBWkI5NXIwU2hvY1pEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MTk1ODA1Mzl9'
    const headers = {
        Cookie: cookie,
        'X-Ig-App-Id': '1217981644879628',
        "Content-Type": "application/json"
    }
    const payload = {
        "variables": {
            "data": {
                "query": username
            },
            "hasQuery": true
        },
        "doc_id": 7778489908879212
    }

    const response = await axios.post(url, payload, { headers })
    return response.data.data.xdt_api__v1__fbsearch__topsearch_connection.users[0].user
}

const checkFollowers = async (userID) => {
    const url = 'https://www.instagram.com/graphql/query';
    const cookie = 'ps_n=1; ps_l=1; ig_did=79E6920E-2047-40A0-BBEB-3E96B8DF9955; ig_nrcb=1; mid=Zk9vXAABAAF8OJnil3UJbiqwQ1qY; datr=XG9PZkltcTH_51diD_KVhya3; fbm_124024574287414=base_domain=.instagram.com; csrftoken=a1do2jZYcQjNbKL8E3A78L8gDISHyC3C; ds_user_id=8616935667; dpr=1.7000000476837158; shbid="5535\\0548616935667\\0541751110778:01f728aeba7d9790b5b7b74132c8fdf0d1923ff880561f4df809d8449f45bc9e9b3aeda3"; shbts="1719574778\\0548616935667\\0541751110778:01f7055924908b323c125368dccf5ebafdc92ca7a2023fbcd6a5c91c14553a75daa85ffe"; sessionid=8616935667%3AaiOqJOFNYZ8bHc%3A21%3AAYeU4z5_uA_6nXwCwH-Y8YR35z_N1cT53yzGjtLcig; wd=424x809; rur="CCO\\0548616935667\\0541751116502:01f7c88b4b559b8332954235a7648c88b9be77d8ab1c54fb82e843655a366e67e42bc072"; fbsr_124024574287414=CkHMsZAugEkMdQ19rmXG2i_gtcvgRbp2R5AzAAQ8udw.eyJ1c2VyX2lkIjoiMTAwMDI1MzMwNjM5NTM2IiwiY29kZSI6IkFRQnFoN1d0UGNGbURzU3FQdG1WMUFqY0RaVDdDcVpocXJPRW5NRGI1cW02UXNvTVVTS2RjVGpnbXVHWmthMnM4WFVvenpMUmJORjR5MDJSSXJabndYLVRpTjl4ZUxCU20zTjVrTTFDSUVyZ0gzSS1UN2dZY0dwdmRVX29OY3pqdjFpVjA0ZWFaVU1RZHlJSERhWkhqZmR1RjNQZWVGVEF6TnpteGtBTC1MVnk0XzNYMWo4aUhGNnhUdUpPUVkyZXIzWXBQX0xaMHdlbVZxUldlUDFsMlZlbkk5ZktBcXV5UVNENFNxRHQtYUV4WDJpc19wb2JMa0RTa2ZHaU5tOEtES0JoU3ZQbG5kX01lWWVkS1c0cXpCelNOY0hNNHI0YVl2clQ4QjJpNU1XUFVZVGRfeTI5QzYzNzlwZEs5NHRvSVNtNktMRFZQMXhLb2ZVYzB4WXdDQkZiIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCT1pCWENTWkJLdXhCWkJqc0JwcHZWREl2U2piRVBHeUdTS0cwbjZiNVZ2SktzVW5BeEZ6SjR3dDNXREhLcmthYXNaQ3VVZHVVV1ZNN3U1T3NZd0c2Mkg0Z2lGb2tyZW16MEFEWkF3eVRibVVqZ043bHRzMVhHekhLbDh5UDZZQWh5ODhxWTRROWJQVXZVdFhGcjNXZ0QzWU92d2REempaQWJZdmNzT0VsN1pCazEzdzJBWkI5NXIwU2hvY1pEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MTk1ODA1Mzl9'
    const headers = {
        Cookie: cookie,
        'X-Ig-App-Id': '1217981644879628',
        "Content-Type": "application/json"
    }
    const payload = {
        "variables": { "id": `${userID}`, "render_surface": "PROFILE" },
        "doc_id": 7663723823674585
    }

    const response = await axios.post(url, payload, { headers })
    const currentFollowers = response.data.data.user.follower_count
    return currentFollowers
}

/**
 * 
 * @param {Array<Object>} followers 
 * @param {number} currentFollowers 
 * @param {Array<Object>} users 
 * @param {number} count 
 * @param {string} next_max_id 
 */
const progressBar = (followers, currentFollowers, users, count, next_max_id) => {
    const n = 10
    let percentage = Math.round((followers.length / currentFollowers) * n)
    console.log(`+ ${String(count).length == 1 ? `0${count}` : count} from ${users.length}, (${String(followers.length).length == 2 ? `0${followers.length}` : followers.length}), [${'⬜'.repeat(percentage)}${'⬛'.repeat(n - percentage)}] MaxID: ${next_max_id}`)
}

const getFollowers = async (userID) => {
    const cookie = 'ps_n=1; ps_l=1; ig_did=79E6920E-2047-40A0-BBEB-3E96B8DF9955; ig_nrcb=1; mid=Zk9vXAABAAF8OJnil3UJbiqwQ1qY; datr=XG9PZkltcTH_51diD_KVhya3; fbm_124024574287414=base_domain=.instagram.com; csrftoken=a1do2jZYcQjNbKL8E3A78L8gDISHyC3C; ds_user_id=8616935667; dpr=1.7000000476837158; shbid="5535\\0548616935667\\0541751110778:01f728aeba7d9790b5b7b74132c8fdf0d1923ff880561f4df809d8449f45bc9e9b3aeda3"; shbts="1719574778\\0548616935667\\0541751110778:01f7055924908b323c125368dccf5ebafdc92ca7a2023fbcd6a5c91c14553a75daa85ffe"; sessionid=8616935667%3AaiOqJOFNYZ8bHc%3A21%3AAYeU4z5_uA_6nXwCwH-Y8YR35z_N1cT53yzGjtLcig; wd=424x372; rur="CCO\\0548616935667\\0541751111956:01f7f2353401a83079016258e66c78e8c5fe7dcd2c27cec4e04d6fb36ba9724160806202"; fbsr_124024574287414=klB07Lifrkm2G5BdKv-9-Y9eBMA_l3RCcHqfLnX09qE.eyJ1c2VyX2lkIjoiMTAwMDI1MzMwNjM5NTM2IiwiY29kZSI6IkFRQmc0cTYwdUZFTVZ4QXRIZkNBNk82R2hGa1FzLUFCMDJzVXM1Q2UwVjRLMEw0MEdPTzNRaEMwZXFoYUI4blRwZnAxY09EZ1prT3BCbkRRNGdOOGNxUWNIRUFiWjR4dFRRb21UcXY0T0ZTNGxhZWxPaEdxcFVRWW9PWll6Zm5aU21hSk9xM2dPU1dReFFQajNIWDRXRDJTd2pIZzI0dWNuVlJDdFowcWhEWHhpM01IdkR2MHh0VWVUY09ubGJ5SEExbGFETk5uQVpFcDVxOTk4bHhGZE55emdzTFlZazRWVEJ6WTFFT0dYUkZCRmVLaXlkUURIZkJIZkpWMk9DZU9HZEpJWWRGdmc5RTFpTmZmRlEwb1pIUW1UMHQ0NXRZT0loSjdzWDZVQ041YjFYb29ROVlwMDhORE03NXRlYnRCTnNnVDllZC1zMlB4NFp5NGlhUGlJbGotIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCT3laQ3planZtZUJTTWptN3FjZTl4bGVFdng4WVZXQm9POHF3THI0bFJaQWY1VEl0MWZHeHBjQXVrY1RYaXBSRlpBbUl6MkxpbjJzTENpc2tlSTZyeGhKcHl1MnROUkZseVpCems4dEpBTHV3V3htUUt0TXJZZlJzcjhodUpHWExJbllFRTg4MEluVDdHR2Jha3pPeGhKM3RwN3lXN2N3ODNic3dpeXAxcFpCU3lrRkNjNGxjT1FWa1pEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MTk1NzU5ODB9'
    const link = `https://www.instagram.com/api/v1/friendships/${userID}/followers/?count=24&search_surface=follow_list_page`
    const headers = {
        Cookie: cookie,
        'X-Ig-App-Id': '1217981644879628',
    }
    try {
        const response = await axios.get(link, { headers })
        let count = 0;
        let { users, next_max_id } = response.data
        const followers = users.map(follower => {
            count++
            return {
                username: follower.username,
                full_name: follower.full_name,
                has_anonymous_profile_picture: follower.has_anonymous_profile_picture,
                profile_pic_url: follower.profile_pic_url,
                pk: follower.pk
            }
        })
        const currentFollowers = await checkFollowers(userID)
        let linkMid = `https://www.instagram.com/api/v1/friendships/${userID}/followers/?count=24&max_id=${encodeURI(next_max_id)}&search_surface=follow_list_page`
        progressBar(followers, currentFollowers, users, count, next_max_id)
        while (followers.length < currentFollowers) {
            // const currentMaxID = next_max_id
            const response = await axios.get(linkMid, { headers })
            const { users, next_max_id } = response.data
            linkMid = `https://www.instagram.com/api/v1/friendships/${userID}/followers/?count=12&max_id=${encodeURI(next_max_id)}&search_surface=follow_list_page`
            let count = 0;
            users.forEach(follower => {
                if (!followers.find(f => f.username === follower.username)) {
                    followers.push({
                        username: follower.username,
                        full_name: follower.full_name,
                        has_anonymous_profile_picture: follower.has_anonymous_profile_picture,
                        profile_pic_url: follower.profile_pic_url,
                        pk: follower.pk
                    })
                    count++
                }
            })
            progressBar(followers, currentFollowers, users, count, next_max_id)
            if (next_max_id == undefined) {
                const response = await axios.get(linkMid, { headers })
                const { users, next_max_id } = response.data
                linkMid = `https://www.instagram.com/api/v1/friendships/${userID}/followers/?count=24&max_id=${encodeURI(next_max_id)}&search_surface=follow_list_page`
                users.forEach(follower => {
                    if (!followers.find(f => f.username === follower.username)) {
                        followers.push({
                            username: follower.username,
                            full_name: follower.full_name,
                            has_anonymous_profile_picture: follower.has_anonymous_profile_picture,
                            profile_pic_url: follower.profile_pic_url,
                            pk: follower.pk
                        })
                    }
                })
                progressBar(followers, currentFollowers, users, count, next_max_id)
            }
        }

        const lengkap = await Promise.all(followers.map(async (follower, i) => {
            const user = await getUser(follower.username)
            follower.search_social_context = user.search_social_context
            console.log(`Fetching.. [${Math.round((i + 1) / followers.length * followers.length)}%]`)
            return follower
        }))
        
        writeFileSync(path.join(__dirname, 'followers.json'), JSON.stringify(lengkap))
        console.log(`Followers exported! Total followers: ${lengkap.length}`)
    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
        } else {
            console.log(error)
        }
    }

}

const inputStream = createInterface({
    input: process.stdin,
    output: process.stdout
});

inputStream.question('Username: ', async name => {
    if (name) {
        const { full_name, pk, username } = await getUser(name)
        console.log(`[ Username : ${username} ]\n[ Full Name : ${full_name} ]\n[ UserID : ${pk} ]\n[ Current Followers: ${await checkFollowers(pk)} ]`)
        getFollowers(pk)
    } else {
        console.log('Please input username!')
    }
    inputStream.close();
});