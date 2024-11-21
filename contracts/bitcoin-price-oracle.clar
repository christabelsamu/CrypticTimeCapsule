;; bitcoin-price-oracle.clar

;; Define data vars
(define-data-var btc-price uint u0)

;; Define admin principal
(define-constant contract-owner tx-sender)

;; Public functions
(define-public (set-btc-price (price uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (ok (var-set btc-price price))
  )
)

(define-read-only (get-btc-price)
  (var-get btc-price)
)

