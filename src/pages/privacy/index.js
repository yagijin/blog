import React from 'react'
import Layout from '../../components/Layout'
import '../../components/all.sass'
import Header from '../../components/Header'

const PrivacyPolicyPage = () => (
  <Layout>
    <Header/>
    <section className="section section--gradient" style={{paddingTop: "0px"}}>
      <div className="container">
        <div className="section" style={{paddingBottom: "0px"}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    PrivacyPolicy
                  </h3>
                  <p>
                    本サイトでは，アクセスデータの分析と解析のためにGoogle Analyticsを使用しています．
                    その際に，Googleがお使いのブラウザ上にCookieを設定したり既存のCookieの読み取りを行う場合があります．
                  </p>
                  <p>
                    また，本サイトをご利用中のブラウザは，Googleに特定の非個人情報を自動的に送信します． 当サイトはそれらの情報を，サイトの質の向上のために利用する可能性があります． 
                    本サイトのユーザは本サイトを利用することにより，上記方法および目的においてGoogleとサイト管理者が行うこのようなデータ処理に対して， 許可を与えたものとみなします．
                  </p>
                  <p>
                    Google社によるアクセス情報の収集方法および利用方法については，<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" style={{color:"#698474"}}>Google Analyticsサービス利用規約</a>および<a href="https://policies.google.com/privacy" style={{color:"#698474"}}>Google社プライバシーポリシー</a>によって定められています．
                    なお,ユーザはブラウザの設定によりCookieの受け取りを拒否することができます.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default PrivacyPolicyPage