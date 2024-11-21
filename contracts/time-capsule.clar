;; time-capsule.clar

;; Define data vars
(define-data-var next-capsule-id uint u0)

;; Define data maps
(define-map capsules
  { capsule-id: uint }
  {
    owner: principal,
    message: (string-utf8 1024),
    unlock-time: uint,
    is-unlocked: bool
  }
)

;; Public functions
(define-public (create-capsule (message (string-utf8 1024)) (unlock-time uint))
  (let
    (
      (capsule-id (var-get next-capsule-id))
    )
    (map-set capsules
      { capsule-id: capsule-id }
      {
        owner: tx-sender,
        message: message,
        unlock-time: unlock-time,
        is-unlocked: false
      }
    )
    (var-set next-capsule-id (+ capsule-id u1))
    (ok capsule-id)
  )
)

(define-public (unlock-capsule (capsule-id uint))
  (let
    (
      (capsule (unwrap! (map-get? capsules { capsule-id: capsule-id }) (err u404)))
      (current-time (unwrap! (get-block-info? time (- block-height u1)) (err u500)))
    )
    (asserts! (is-eq (get owner capsule) tx-sender) (err u403))
    (asserts! (not (get is-unlocked capsule)) (err u400))
    (asserts! (>= current-time (get unlock-time capsule)) (err u403))
    (map-set capsules
      { capsule-id: capsule-id }
      (merge capsule { is-unlocked: true })
    )
    (ok true)
  )
)

(define-read-only (get-capsule (capsule-id uint))
  (map-get? capsules { capsule-id: capsule-id })
)

