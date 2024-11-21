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



