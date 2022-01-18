/**
 * ajax 호출 공통모듈
 * @type {{mainCall: ajaxCall.mainCall}}
 */
const ajaxCall = {
    mainCall: function (Method, url, data, dataType, successCallBack, errorCallBack) {
        $.ajax({
            Method: Method,
            url: url,
            data: data,
            dataType: dataType,
            beforeSend: function (xhr) {
                //csrf 토큰 추가시 활성화 필요
                //xhr.setRequestHeader(token_header, token);
            },
            success: function (response) {
                if (!cmnUtil.isEmpty(successCallBack)) {
                    successCallBack(response);
                }
            },
            error: function (request, status, error) {
                errorCallBack(error);
            }
        });
    }
}

/**
 * ajax call 로 넘겨받은 정보 체크
 * @type {{isEmpty: ((function(*): (boolean))|*)}}
 */
const cmnUtil = {
    isEmpty: function (value) {
        // 단순화 작업
        // if (value === "" || value === null || value === undefined) {
        //     return true;
        // } else {
        //     return false;
        // }
        return value === "" || value === null || value === undefined;
    }
}
